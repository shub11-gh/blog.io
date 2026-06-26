import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index'

function Footer() {
    return (
        <footer className='w-full bg-gray-700 border-t border-gray-700 mt-auto'>
            {/* Main footer content */}
            <div className='mx-auto max-w-7xl px-2 py-4'>
                {/* Changed: Applied flex column by default, splitting cleanly with justify-between on desktop */}
                <div className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-4 items-start'>

                    {/* Brand column */}
                    {/* Changed: Keeps clean left-alignment boundary */}
                    <div className='max-w-xs'>
                        <div className='flex flex-col gap-3'>
                            <Logo width='60px' showName={true} />
                            <p className='text-sm text-gray-100 italic leading-relaxed'>
                                A modern blogging platform to share your thoughts and ideas with the world.
                            </p>
                        </div>
                    </div>

                    {/* Links Column Wrapper */}
                    {/* Changed: Controlled width fully via clean flex/grid. Acts as the right anchor block */}
                    <div className='w-full lg:w-auto grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 lg:gap-x-16 xl:gap-x-24'>
                        {/* Company links */}
                        {/* Changed: Removed px-2, fixed percentages, and responsive margins that break boundaries */}
                        <div>
                            <h3 className='mb-3 text-[13px] font-bold uppercase tracking-widest text-gray-200'>
                                Company
                            </h3>
                            <ul className='space-y-1.5'>
                                {['Features', 'Pricing', 'Affiliate'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to='/'
                                            className='text-sm text-gray-100 hover:text-gray-300 transition-colors duration-150'
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support links */}
                        <div>
                            <h3 className='mb-3 text-[13px] font-bold uppercase tracking-widest text-gray-200'>
                                Support
                            </h3>
                            <ul className='space-y-1.5'>
                                {['Account', 'Help', 'Contact Us'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to='/'
                                            className='text-sm text-gray-100 hover:text-gray-300 transition-colors duration-150'
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal links */}
                        {/* Changed: Allowed grid alignment rules to manage sizing cleanly on all screen devices */}
                        <div className='col-span-2 sm:col-span-1'>
                            <h3 className='mb-3 text-[13px] font-bold uppercase tracking-widest text-gray-200'>
                                Legals
                            </h3>
                            <ul className='space-y-1.5'>
                                {['Terms & Conditions', 'Privacy Policy', 'Licensing'].map((item) => (
                                    <li key={item}>
                                        <Link
                                            to='/'
                                            className='text-sm text-gray-100 hover:text-gray-300 transition-colors duration-150'
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className='bg-gray-800'>
                <div className='mx-auto max-w-7xl px-4 py-2 flex flex-col items-center justify-evenly gap-1'>
                    <div className='flex items-center gap-4 order-1'>
                        <Link to='/' className='text-sm text-white font-light hover:text-gray-300 transition-colors'>Privacy</Link>
                        <Link to='/' className='text-sm text-white font-light hover:text-gray-300 transition-colors'>Terms</Link>
                        <Link to='/' className='text-sm text-white font-light hover:text-gray-300 transition-colors'>Cookies</Link>
                    </div>
                    <p className='text-sm text-white font-400 order-2 sm:order-1'>
                        &copy; {new Date().getFullYear()} Blog.io. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
