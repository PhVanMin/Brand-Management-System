import RedeemList from './components/redeemed-list'
import VoucherList from './components/voucher-list'

export default function Vouchers() {
    return (
        <div className="grid gap-4 p-4 grid-cols-3">
            <VoucherList className="col-span-2" />
            <RedeemList />
        </div>
    )
}
