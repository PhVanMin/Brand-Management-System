import Info from './components/info'
import Overview from './components/overview'

export default function Events() {
    return (
        <div className="p-4 grid gap-4 grid-cols-3">
            <Overview className="col-span-2" />
            <Info />
        </div>
    )
}
