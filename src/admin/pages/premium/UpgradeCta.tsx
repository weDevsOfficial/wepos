import { __ } from '@wordpress/i18n';
import PrimaryLink from './PrimaryLink';
import { UPGRADE_URL } from './data';

const UpgradeCta = () => (
	<section className="relative overflow-hidden rounded-[20px] bg-[#000823] px-10 py-[68px]">
		{ /* Soft haze at the right edge — the design's decorative art, as a
		     gradient so it blends into the panel at any width. */ }
		<div className="pointer-events-none absolute -right-20 top-0 hidden size-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,57,246,0.35)_0%,rgba(0,8,35,0)_70%)] lg:block" />

		<div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
			<div className="flex max-w-[458px] flex-col gap-4 text-white">
				<h2 className="m-0 text-2xl font-bold leading-8 text-white">
					{ __(
						'Replace Two Systems With One Connected POS',
						'wepos'
					) }
				</h2>
				<p className="m-0 text-sm leading-5 text-white">
					{ __(
						'Stop juggling a separate till and a spreadsheet. Run every online and in-store sale from one dashboard with wePOS Pro.',
						'wepos'
					) }
				</p>
			</div>

			<PrimaryLink href={ UPGRADE_URL } className="shrink-0">
				{ __( 'Upgrade to Pro', 'wepos' ) }
			</PrimaryLink>
		</div>
	</section>
);

export default UpgradeCta;
