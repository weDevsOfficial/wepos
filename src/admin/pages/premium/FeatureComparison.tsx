import { __ } from '@wordpress/i18n';
import { Check, Crown, Lock } from 'lucide-react';
import { COMPARISON_ROWS } from './data';

const CheckCell = () => (
	<span className="inline-flex size-8 items-center justify-center rounded-full bg-[#ecfdf5]">
		<Check className="size-4 text-[#059669]" />
	</span>
);

const LockCell = () => (
	<span className="inline-flex size-8 items-center justify-center rounded-full bg-[#f3f4f6]">
		<Lock className="size-4 text-[#9ca3af]" />
	</span>
);

const FeatureComparison = () => (
	<div className="flex flex-col items-start gap-11 lg:flex-row lg:justify-center">
		<div className="flex w-full flex-col gap-4 lg:w-[385px] lg:shrink-0">
			<h2 className="m-0 text-[30px] font-bold leading-[1.3] text-[#1f2937]">
				{ __(
					'Powerful Features Available Only in wePOS Pro',
					'wepos'
				) }
			</h2>
			<p className="m-0 text-sm leading-[1.4] text-[#6b7280]">
				{ __(
					'You are on the free version. Unlock advanced reports, multi-outlet control, CSV export, and full Dokan vendor support when you upgrade to wePOS Pro.',
					'wepos'
				) }
			</p>
		</div>

		<div className="w-full overflow-hidden rounded-2xl border border-[rgba(231,229,228,0.5)] bg-white lg:flex-1">
			<table className="w-full border-collapse text-left">
				<thead>
					<tr className="bg-[linear-gradient(90deg,#fffbf2_0%,#ffffff_60%)]">
						<th className="px-6 py-5 text-sm font-medium text-[#374151]">
							{ __( 'Feature', 'wepos' ) }
						</th>
						<th className="w-[110px] px-4 py-5 text-center text-sm font-medium text-[#374151]">
							{ __( 'Lite', 'wepos' ) }
						</th>
						<th className="w-[110px] px-4 py-5 text-sm font-medium text-[#374151]">
							<span className="flex items-center justify-center gap-2">
								{ __( 'Pro', 'wepos' ) }
								<span className="inline-flex size-6 items-center justify-center rounded-full bg-[#f59e0b]">
									<Crown className="size-[14px] text-white" />
								</span>
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{ COMPARISON_ROWS.map( ( row ) => (
						<tr
							key={ row.feature }
							className="border-t border-[#f3f4f6]"
						>
							<td className="px-6 py-4 text-sm text-[#374151]">
								{ row.feature }
							</td>
							<td className="px-4 py-4 text-center">
								{ row.lite ? <CheckCell /> : <LockCell /> }
							</td>
							<td className="px-4 py-4 text-center">
								<CheckCell />
							</td>
						</tr>
					) ) }
				</tbody>
			</table>
		</div>
	</div>
);

export default FeatureComparison;
