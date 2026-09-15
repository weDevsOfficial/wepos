import { __ } from '@wordpress/i18n';
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@wedevs/plugin-ui';
import { Check, ExternalLink } from 'lucide-react';

const UPGRADE_URL = 'https://dokan.co/wordpress/wepos/pricing/';

/**
 * Pro-only features advertised on this page. Mirrors the "wePOS Pro" list in
 * readme.txt — keep both in sync when the feature set changes.
 */
const PRO_FEATURES: Array< { title: string; description: string } > = [
	{
		title: __( 'Advanced Reports Dashboard', 'wepos' ),
		description: __(
			'Sales summaries, charts, recent orders, payment reports, and inventory alerts.',
			'wepos'
		),
	},
	{
		title: __( 'CSV Export', 'wepos' ),
		description: __(
			'Export orders directly from the POS dashboard.',
			'wepos'
		),
	},
	{
		title: __( 'Save Carts', 'wepos' ),
		description: __(
			'Save active carts and continue checkout later across devices.',
			'wepos'
		),
	},
	{
		title: __( 'Advanced Access Control', 'wepos' ),
		description: __(
			'Control which POS pages and actions cashiers can access.',
			'wepos'
		),
	},
	{
		title: __( 'Receipt Customization', 'wepos' ),
		description: __(
			'Customize receipt headers, footers, and receipt fields.',
			'wepos'
		),
	},
	{
		title: __( 'Low Stock Alerts', 'wepos' ),
		description: __(
			'Monitor low-stock and out-of-stock products easily.',
			'wepos'
		),
	},
	{
		title: __( 'Quick Product Editing', 'wepos' ),
		description: __(
			'Update stock, categories, tags, and pricing instantly.',
			'wepos'
		),
	},
	{
		title: __( 'Multi-Outlet Features', 'wepos' ),
		description: __(
			'Assign outlets to vendors and cashiers for better store management.',
			'wepos'
		),
	},
	{
		title: __( 'Dokan Multivendor POS', 'wepos' ),
		description: __(
			'Per-vendor POS dashboards with complete data isolation and vendor staff management.',
			'wepos'
		),
	},
];

const PremiumIcon = ( { className }: { className?: string } ) => (
	<svg
		viewBox="0 0 15 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={ className }
		aria-hidden="true"
	>
		<path
			d="M2.93011 9.37658L1.75806 3.51629L4.98121 5.86041L7.03231 2.34424L9.08341 5.86041L12.3066 3.51629L11.1345 9.37658H2.93011ZM11.1345 11.1347C11.1345 11.2901 11.0728 11.4391 10.9629 11.549C10.853 11.6589 10.7039 11.7207 10.5485 11.7207H3.51614C3.36072 11.7207 3.21166 11.6589 3.10176 11.549C2.99186 11.4391 2.93011 11.2901 2.93011 11.1347V10.5486H11.1345V11.1347Z"
			fill="#FFB900"
		/>
	</svg>
);

const Premium = () => {
	return (
		<div className="wepos-admin-premium p-6 space-y-6">
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-xl">
						<PremiumIcon className="size-5" />
						{ __( 'wePOS Premium', 'wepos' ) }
					</CardTitle>
					<CardDescription>
						{ __(
							'Unlock advanced retail and multivendor tools for your store — reports, saved carts, receipt customization, and more.',
							'wepos'
						) }
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Button
						nativeButton={ false }
						render={
							// eslint-disable-next-line jsx-a11y/anchor-has-content
							<a
								href={ UPGRADE_URL }
								target="_blank"
								rel="noopener noreferrer"
							/>
						}
					>
						{ __( 'Upgrade to Premium', 'wepos' ) }
						<ExternalLink className="size-4 ml-2" />
					</Button>
				</CardContent>
			</Card>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{ PRO_FEATURES.map( ( feature ) => (
					<Card key={ feature.title }>
						<CardContent className="flex gap-3 p-4">
							<Check className="size-4 mt-0.5 shrink-0 text-success" />
							<div>
								<div className="text-sm font-medium text-foreground">
									{ feature.title }
								</div>
								<p className="mt-1 text-sm text-muted-foreground">
									{ feature.description }
								</p>
							</div>
						</CardContent>
					</Card>
				) ) }
			</div>
		</div>
	);
};

export default Premium;
