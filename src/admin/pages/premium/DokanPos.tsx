import { __ } from '@wordpress/i18n';
import PrimaryLink from './PrimaryLink';
import SectionHeading from './SectionHeading';
import { DOKAN_POS_DOC_URL, premiumAsset } from './data';

const DokanPos = () => (
	<section className="flex flex-col items-center gap-10">
		<SectionHeading
			title={ __( 'Dokan Multivendor POS', 'wepos' ) }
			description={ __(
				'Run a marketplace? wePOS gives every vendor their own point of sale. Each seller manages their own products, customers, orders, and receipts, while you keep full control of the marketplace.',
				'wepos'
			) }
			className="max-w-[581px]"
		/>

		<div className="w-full overflow-hidden rounded-[20px]">
			<img
				src={ premiumAsset( 'dokan-pos.png' ) }
				alt={ __( 'wePOS running as a Dokan vendor POS', 'wepos' ) }
				className="block aspect-[16/9] w-full object-cover"
			/>
		</div>

		<PrimaryLink href={ DOKAN_POS_DOC_URL }>
			{ __( 'View Details', 'wepos' ) }
		</PrimaryLink>
	</section>
);

export default DokanPos;
