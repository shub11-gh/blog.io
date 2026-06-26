import React from 'react'
import { Link } from 'react-router-dom'

function Logo({ width = '40px', showName = true }) {
    return (
        <Link to='/' className='flex items-center gap-2 group'>
            <div
                style={{ width: width, height: width }}
                className='rounded-full overflow-hidden ring-2 ring-gray-200 p-1'
            >
                <img
                    src="/logo.png"
                    alt="Blog.io Logo"
                    className='w-full h-full object-cover pb-1 px-0.5'
                />
            </div>
            {showName && (
                <span className='text-3xl font-bold tracking-tight text-white'>
                    Blog.io
                </span>
            )}
        </Link>
    )
}

export default Logo