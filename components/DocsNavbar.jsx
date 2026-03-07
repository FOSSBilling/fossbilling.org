'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import cn from 'clsx'
import NextLink from 'next/link'
import { Anchor, Button } from 'nextra/components'
import { useFSRoute } from 'nextra/hooks'
import { ArrowRightIcon, DiscordIcon, GitHubIcon, MenuIcon } from 'nextra/icons'
import { setMenu, useConfig, useMenu, useThemeConfig } from 'nextra-theme-docs'

const defaultGitHubIcon = (
  <GitHubIcon height="24" aria-label="Project repository" />
)
const defaultChatIcon = <DiscordIcon width="24" />

const classes = {
  link: cn(
    'x:text-sm x:contrast-more:text-gray-700 x:contrast-more:dark:text-gray-100 x:whitespace-nowrap',
    'x:text-gray-600 x:hover:text-black x:dark:text-gray-400 x:dark:hover:text-gray-200',
    'x:ring-inset x:transition-colors'
  )
}

const isMenu = (page) => page.type === 'menu'

const NavbarMenu = ({ menu, children }) => {
  const routes = Object.fromEntries(
    (menu.children || []).map((route) => [route.name, route])
  )

  return (
    <Menu>
      <MenuButton
        className={({ focus }) =>
          cn(
            classes.link,
            'x:items-center x:flex x:gap-1.5 x:cursor-pointer',
            focus && 'x:nextra-focus'
          )
        }
      >
        {children}
        <ArrowRightIcon
          height="14"
          className="x:*:origin-center x:*:transition-transform x:*:rotate-90"
        />
      </MenuButton>
      <MenuItems
        transition
        className={cn(
          'x:focus-visible:nextra-focus',
          'nextra-scrollbar x:motion-reduce:transition-none',
          'x:origin-top x:transition x:duration-200 x:ease-out x:data-closed:scale-95 x:data-closed:opacity-0',
          'x:border x:border-black/5 x:dark:border-white/20',
          'x:z-30 x:rounded-md x:py-1 x:text-sm x:shadow-lg',
          'x:backdrop-blur-md x:bg-nextra-bg/70',
          'x:max-h-[min(calc(100vh-5rem),256px)]!'
        )}
        anchor={{ to: 'bottom', gap: 10, padding: 16 }}
      >
        {Object.entries(menu.items || {}).map(([key, item]) => (
          <MenuItem
            key={key}
            as={Anchor}
            href={item.href || routes[key]?.route}
            className={({ focus }) =>
              cn(
                'x:block x:py-1.5 x:transition-colors x:ps-3 x:pe-9',
                focus
                  ? 'x:text-gray-900 x:dark:text-gray-100'
                  : 'x:text-gray-600 x:dark:text-gray-400'
              )
            }
          >
            {item.title}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

const ClientNavbar = ({ children, className }) => {
  const items = useConfig().normalizePagesResult.topLevelNavbarItems
  const themeConfig = useThemeConfig()
  const pathname = useFSRoute()
  const menu = useMenu()

  return (
    <>
      <div
        className={cn(
          'x:flex x:gap-4 x:overflow-x-auto nextra-scrollbar x:py-1.5 x:max-md:hidden',
          className
        )}
      >
        {items.map((page, _index, arr) => {
          if ('display' in page && page.display === 'hidden') {
            return null
          }
          if (isMenu(page)) {
            return (
              <NavbarMenu key={page.name} menu={page}>
                {page.title}
              </NavbarMenu>
            )
          }

          const href =
            ('frontMatter' in page ? page.route : page.firstChildRoute) ||
            page.href ||
            page.route
          const isCurrentPage =
            href === pathname ||
            (href && href.startsWith('/') && pathname.startsWith(`${href}/`)) ||
            (pathname.startsWith(`${page.route}/`) &&
              arr.every((item) => !('href' in item) || item.href !== pathname)) ||
            undefined

          return (
            <Anchor
              key={page.name}
              href={href}
              className={cn(
                classes.link,
                'x:aria-[current]:font-medium x:aria-[current]:subpixel-antialiased x:aria-[current]:text-current'
              )}
              aria-current={isCurrentPage}
            >
              {page.title}
            </Anchor>
          )
        })}
      </div>
      {themeConfig.search && (
        <div className="x:max-md:hidden">{themeConfig.search}</div>
      )}
      {children}
      <Button
        aria-label="Menu"
        className={cn('nextra-hamburger x:md:hidden', menu && 'x:bg-gray-400/20')}
        onClick={() => setMenu((prev) => !prev)}
      >
        <MenuIcon height="24" className={cn({ open: menu })} />
      </Button>
    </>
  )
}

const DocsNavbar = ({
  children,
  logoLink = true,
  logo,
  projectLink,
  projectIcon = defaultGitHubIcon,
  chatLink,
  chatIcon = defaultChatIcon,
  className,
  align = 'right'
}) => {
  const alignLeft = align === 'left'
  const logoClass = cn(
    'x:flex x:items-center',
    alignLeft ? 'x:max-md:me-auto' : 'x:me-auto'
  )

  return (
    <header
      className={cn(
        'nextra-navbar x:sticky x:top-0 x:z-30 x:w-full x:bg-transparent x:print:hidden',
        'x:max-md:[.nextra-banner:not([class$=hidden])~&]:top-(--nextra-banner-height)'
      )}
    >
      <div
        className={cn(
          'nextra-navbar-blur x:absolute x:-z-1 x:size-full',
          'nextra-border x:border-b',
          'x:backdrop-blur-md x:bg-nextra-bg/70'
        )}
      />
      <nav
        style={{ height: 'var(--nextra-navbar-height)' }}
        className={cn(
          'x:mx-auto x:flex x:max-w-(--nextra-content-width) x:items-center x:gap-4',
          'x:pl-[max(env(safe-area-inset-left),1.5rem)] x:pr-[max(env(safe-area-inset-right),1.5rem)]',
          'x:justify-end',
          className
        )}
      >
        {logoLink ? (
          <NextLink
            href={typeof logoLink === 'string' ? logoLink : '/'}
            className={cn(
              logoClass,
              'x:transition-opacity x:focus-visible:nextra-focus x:hover:opacity-75'
            )}
            aria-label="Home page"
          >
            {logo}
          </NextLink>
        ) : (
          <div className={logoClass}>{logo}</div>
        )}
        <ClientNavbar className={alignLeft ? 'x:me-auto' : ''}>
          {projectLink && <Anchor href={projectLink}>{projectIcon}</Anchor>}
          {children}
          {chatLink && <Anchor href={chatLink}>{chatIcon}</Anchor>}
        </ClientNavbar>
      </nav>
    </header>
  )
}

export default DocsNavbar
