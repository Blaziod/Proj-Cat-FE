import './index.css'

export function DashboardLayout({ title, children }) {
	return (
		<div className='dash-layout'>
			<div className='dash-header'>
				<h2>{title}</h2>
			</div>

			<div className='dash-content'>{children}</div>
		</div>
	)
}
