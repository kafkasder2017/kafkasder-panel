import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ className, src, alt, ...props }: AvatarImageProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (src) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [src]);

  if (!src || imageError) {
    return null;
  }

  return (
    <img
      className={cn('aspect-square h-full w-full', className)}
      src={src}
      alt={alt}
      onLoad={() => setImageLoaded(true)}
      onError={() => setImageError(true)}
      style={{ display: imageLoaded ? 'block' : 'none' }}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}