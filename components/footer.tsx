

export const Footer = () => {
    return (
        <footer className="flex flex-col gap-2 py-6 max-w-screen items-center justify-center px-4 md:px-6 border-t lg:flex-row lg:justify-between mt-12 bg-slate-900">
            <p className="text-xs text-slate-50">
                © 2024 Swift Pay end-to-end Wallet.
            </p>
            <nav className="flex gap-4 sm:gap-6">
                <div className="text-xs hover:underline hover:cursor-pointer underline-offset-4 text-gray-50">
                    Terms of Service
                </div>
                <div className="text-xs hover:underline hover:cursor-pointer underline-offset-4 text-gray-50">
                    Privacy
                </div>
            </nav>
        </footer>
    );
};