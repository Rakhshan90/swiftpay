import { cn } from "@/lib/utils"

interface CircularRingLoaderProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export default function CircularRingLoader({ size = 'md', className }: CircularRingLoaderProps = {}) {
    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-6 h-6 border-2',
        lg: 'w-8 h-8 border-3',
    }

    return (
        <div
            className={cn(
                "inline-block rounded-full border-primary border-t-transparent animate-spin",
                sizeClasses[size],
                className
            )}
            role="status"
            aria-label="Loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    )
}