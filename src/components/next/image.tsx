import { default as NextImage } from 'next/image';
import type { ImageProps as NextImageProps } from 'next/image';
import React, { forwardRef } from 'react';

export interface ImageProps extends NextImageProps {
    className?: string;
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
    ({ className, ...props }, ref) => {
        return <NextImage {...props} className={className} ref={ref} />;
    }
);

Image.displayName = 'Image';

export default Image;
