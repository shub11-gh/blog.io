import React from 'react'

function Button({ children, type = 'button', bgColor = 'bg-green-700', textColor = 'text-white', className = '', ...props }) {
    return (

        <button className={` font-medium px-4 py-2 rounded cursor-pointer ${bgColor} ${textColor} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
            {children}
        </button>

    )
}

export default Button