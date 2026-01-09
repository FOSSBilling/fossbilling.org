import type { ComponentPropsWithoutRef } from 'react'

type ButtonAsButton = {
  text: string;
  as?: 'button';
} & ComponentPropsWithoutRef<'button'>

type ButtonAsAnchor = {
  text: string;
  as: 'a';
} & ComponentPropsWithoutRef<'a'>

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button(props: ButtonProps) {
  const { text, as: Component = 'button', ...rest } = props
  const baseClasses = "px-5 py-3 text-base font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-4"
  
  if (Component === 'a') {
    // TypeScript now knows this is ButtonAsAnchor
    const { text: _, as: __, ...anchorProps } = props as ButtonAsAnchor
    return <a className={baseClasses} {...anchorProps}>{text}</a>
  }
  
  // TypeScript now knows this is ButtonAsButton
  const { text: _, as: __, ...buttonProps } = props as ButtonAsButton
  return <button className={baseClasses} {...buttonProps}>{text}</button>
}