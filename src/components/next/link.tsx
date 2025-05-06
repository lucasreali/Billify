import { default as NextLink } from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import React, { forwardRef } from 'react';

export interface LinkProps extends NextLinkProps {
    children?: React.ReactNode;
    className?: string;
    // You can add additional custom props here in the future
}

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, ...props }, ref) => {
        return (
            <NextLink {...props} ref={ref}>
                {children}
            </NextLink>
        );
    }
);

Link.displayName = 'Link';

export default Link;
