export default function SettingsPage() {
    return (
        <section className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <p className="mt-4 leading-7 opacity-80">
                Use the floating settings button in the top-right corner to customize theme, clock style, time format,
                analog options, and visibility settings.
            </p>
            <ul className="mt-8 space-y-3 text-sm opacity-80">
                <li>• Keyboard shortcuts: T for Timer, S for Stopwatch, W for World Clock.</li>
                <li>• Toggle fullscreen from the header controls.</li>
                <li>• Theme auto night mode follows local time after 7 PM.</li>
            </ul>
        </section>
    );
}
