import Info from './components/info'
import Overview from './components/overview'

export default function Events() {
    return (
        <div className="p-4 grid gap-4 lg:grid-cols-3">
            <Overview className="col-span-2" />
            <Info className="lg:col-span-1 col-span-3" />
        </div>
    )
}
