import { Container, Logo, LogoutButton } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]

    return (

        <header className='w-full py-3 shadow-sm bg-gray-800 border-b border-gray-200'>
            <Container>
                <nav className='flex items-center'>
                    <div className='mr-6'>
                        <Logo width='60px' showName={true} />
                    </div>
                    <ul className='flex ml-auto items-center gap-1'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button className='relative text-white font-semibold w-fit inline-block px-6 py-2 duration-200 cursor-pointer after:absolute after:bottom-0 after:left-6 after:right-6 after:h-0.5 after:origin-center after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100 text-[18px]' onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutButton />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header >

    )
}

export default Header