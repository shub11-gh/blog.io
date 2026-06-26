import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/appwriteConfig'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth?.userData)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submit = async (data) => {
        setError('')
        setSubmitting(true)

        // Client-side file validation before hitting Appwrite
        if (data.image[0]) {
            const file = data.image[0]
            const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp']
            const maxSizeMB = 5

            if (!allowedTypes.includes(file.type)) {
                setError(`File type "${file.type}" is not allowed. Please upload PNG, JPG, GIF or WebP.`)
                setSubmitting(false)
                return
            }
            if (file.size > maxSizeMB * 1024 * 1024) {
                setError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum allowed size is ${maxSizeMB} MB.`)
                setSubmitting(false)
                return
            }
        }

        try {
            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

                if (file) {
                    appwriteService.deleteFile(post.featuredImage)
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
            else {
                const uploadedFile = await appwriteService.uploadFile(data.image[0])

                if (userData?.$id) {
                    data.featuredImage = uploadedFile.$id
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id
                    })

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (err) {
            console.error('PostForm submit error:', err)
            setError(err?.message || 'Something went wrong. Please try again.')
        } finally {
            setSubmitting(false)
        }
    }


    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')     // remove special chars
                .replace(/\s+/g, '-')             // spaces → hyphens
                .replace(/-+/g, '-')              // collapse consecutive hyphens
                .replace(/^-+|-+$/g, '')          // strip leading/trailing hyphens
                .substring(0, 36)                 // Appwrite max ID length

        return ''
    }, [])


    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title, { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["Active", "Inactive"]}
                    value="Active"
                    label="Status"
                    className="mb-4 cursor-pointer"
                    {...register("status", { required: true })}
                />
                {error && (
                    <p className="text-red-600 text-sm mb-3 text-center font-medium">{error}</p>
                )}
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-700" : undefined}
                    className="w-full"
                    disabled={submitting}
                >
                    {submitting ? (post ? 'Updating...' : 'Submitting...') : (post ? 'Update' : 'Submit')}
                </Button>
            </div>
        </form>
    )
}

export default PostForm