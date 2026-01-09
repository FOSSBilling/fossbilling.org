import type { ComponentPropsWithoutRef } from 'react'

type ButtonProps = {
  text: string;
  as?: 'button' | 'a';
} & ComponentPropsWithoutRef<'button'> &
  ComponentPropsWithoutRef<'a'>

export function Button({ text, as: Component = 'button', ...props }: ButtonProps) {
  const baseClasses = "px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
  
  if (Component === 'a') {
    return <a className={baseClasses} {...props}>{text}</a>
  }
  
  return <button className={baseClasses} {...props}>{text}</button>
}