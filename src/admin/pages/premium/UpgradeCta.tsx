import { __ } from '@wordpress/i18n';
import PrimaryLink from './PrimaryLink';
import { premiumAsset, UPGRADE_URL } from './data';

const UpgradeCta = () => (
	<section className="relative overflow-hidden rounded-[20px] bg-[#000823] px-10 py-[68px]">
		<img
			src={ premiumAsset( 'cta-glow.png' ) }
			alt=""
			className="pointer-events-none absolute -right-[60px] top-0 hidden h-full w-[400px] max-w-none object-cover opacity-30 lg:block"
		/>

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
