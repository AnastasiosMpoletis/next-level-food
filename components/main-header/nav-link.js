'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from './nav-link.module.css'

/**
 * We should add client components as bottom level as possible.
 * This is why we create this component and make it client instead of the main-header.
 * We can use client components in server components.
 * 
 * @param {*} param0 
 * @returns 
 */
export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}
    >
      {children}
    </Link>
  );
}