import React from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useRef, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Slot, SlotFillProvider } from '@wordpress/components';
import { PluginArea } from '@wordpress/plugins';
import {
	Button,
	ThemeProvider,
	TopBar,
	type ThemeTokens,
} from '@wedevs/plugin-ui';
import { BookOpen, CircleHelp, Headphones } from 'lucide-react';

export const HEADER_SLOT_NAME = 'wepos-admin-header-before-info-section';
const HEADER_PLUGIN_SCOPE = 'wepos-admin-header';

/** Version pill: `#FFF4F2` fill, 20% `#F0644B` hairline, fully rounded. */
const BRAND_ACCENT = '#F0644B';
const VERSION_BADGE_CLASS =
	'rounded-full border-[#F0644B]/20 bg-[#FFF4F2] text-[#F0644B] md:px-3 md:py-1';

interface HeaderInfo {
	logo_url?: string;
	version?: string;
	is_pro_active?: boolean;
	pro_version?: string;
	upgrade_url?: string;
	docs_url?: string;
	support_url?: string;
}

/**
 * Help dropdown — docs and support.
 *
 * Hand-rolled instead of the plugin-ui `DropdownMenu`: that portals to
 * `document.body`, and the app root's `ShadowContainer` patches
 * `document.body.appendChild` to pull `.pui-root` portals into its shadow
 * tree, which would swallow this menu.
 */
const HelpMenu = ( { docsUrl, supportUrl }: { docsUrl: string; supportUrl: string } ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const wrapperRef = useRef< HTMLDivElement | null >( null );

	useEffect( () => {
		if ( ! isOpen ) {
			return;
		}

		const onDocumentDown = ( event: MouseEvent ) => {
			if ( ! wrapperRef.current?.contains( event.target as Node ) ) {
				setIsOpen( false );
			}
		};

		document.addEventListener( 'mousedown', onDocumentDown );
		return () => document.removeEventListener( 'mousedown', onDocumentDown );
	}, [ isOpen ] );

	const items = [
		{
			icon: <BookOpen className="size-5" />,
			title: __( 'Documentation', 'wepos' ),
			description: __(
				'Set up outlets, receipts and the register — step by step.',
				'wepos'
			),
			href: docsUrl,
		},
		{
			icon: <Headphones className="size-5" />,
			title: __( 'Get Support', 'wepos' ),
			description: __(
				'Stuck on a sale, payment or sync issue? Talk to us.',
				'wepos'
			),
			href: supportUrl,
		},
	].filter( ( item ) => !! item.href );

	if ( ! items.length ) {
		return null;
	}

	return (
		<div ref={ wrapperRef } className="relative h-full">
			<Button
				variant="outline"
				size="icon"
				className="size-9 rounded-full border! border-solid! bg-background text-foreground shadow-none hover:bg-foreground hover:text-background"
				aria-label={ __( 'Help', 'wepos' ) }
				aria-expanded={ isOpen }
				onClick={ () => setIsOpen( ( open ) => ! open ) }
			>
				<CircleHelp className="size-5" />
			</Button>

			{ isOpen && (
				<div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-md border border-solid border-border bg-popover shadow-md">
					{ items.map( ( item ) => (
						<a
							key={ item.title }
							href={ item.href }
							target="_blank"
							rel="noopener noreferrer"
							onClick={ () => setIsOpen( false ) }
							className="flex items-center gap-3 px-4 py-3 no-underline hover:bg-muted"
						>
							<span className="shrink-0 text-muted-foreground">
								{ item.icon }
							</span>
							<span className="flex flex-col gap-1">
								<span className="text-sm font-semibold text-foreground">
									{ item.title }
								</span>
								<span className="text-xs leading-relaxed text-muted-foreground">
									{ item.description }
								</span>
							</span>
						</a>
					) ) }
				</div>
			) }
		</div>
	);
};

const Header = () => {
	const {
		logo_url: logoUrl = '',
		version = '',
		is_pro_active: isProActive = false,
		pro_version: proVersion = '',
		upgrade_url: upgradeUrl = '',
		docs_url: docsUrl = '',
		support_url: supportUrl = '',
	}: HeaderInfo =
		( window as any ).weposAdminPanelHeaderSettings?.header_info || {};

	const versions = [
		{
			/* translators: %s: wePOS version number */
			version: sprintf( __( 'Free: %s', 'wepos' ), version ),
			isPro: false,
			className: VERSION_BADGE_CLASS,
		},
	];

	if ( isProActive ) {
		versions.push( {
			/* translators: %s: wePOS Pro version number */
			version: sprintf( __( 'Pro: %s', 'wepos' ), proVersion ),
			isPro: true,
			className: VERSION_BADGE_CLASS,
			proBadgeBg: BRAND_ACCENT,
			proBadgeColor: '#ffffff',
			proBadgeBorderColor: BRAND_ACCENT,
		} as ( typeof versions )[ number ] );
	}

	return (
		<TopBar
			className="sticky top-8 z-10 items-center border-0 border-b border-solid border-border shadow-sm"
			logo={
				logoUrl ? (
					<img
						src={ logoUrl }
						alt={ __( 'wePOS', 'wepos' ) }
						className="h-full w-auto"
					/>
				) : null
			}
			versions={ versions }
			rightSideComponents={
				<>
					{ /* Extension seam — pro fills this through registerPlugin. */ }
					<Slot
						name={ HEADER_SLOT_NAME }
						fillProps={ { header_info: { version, proVersion } } }
					/>

					{ ! isProActive && !! upgradeUrl && (
						<TopBar.UpgradeBtn
							className="border-[#4f39f6]! bg-[#4f39f6] text-white hover:bg-[#4331d4]"
							upgradeText={ __( 'Upgrade to Pro', 'wepos' ) }
							onClick={ () => {
								window.location.href = upgradeUrl;
							} }
						/>
					) }

					<HelpMenu docsUrl={ docsUrl } supportUrl={ supportUrl } />
				</>
			}
		/>
	);
};

/**
 * Mount the header in its own root, above the page app.
 *
 * Also moves the admin notices `Admin\Header` captured into a hidden
 * wrapper down below the header. Runs at footer script-eval time — before
 * core's `DOMContentLoaded` pass appends stray notices after the
 * `.wp-header-end` catcher inside that wrapper.
 *
 * @param tokens Theme tokens of the calling admin root.
 */
export const mountHeader = ( tokens: ThemeTokens ) => {
	const noticeList = document.getElementById( 'wepos__notice-list' );
	const noticeSlot = document.getElementById( 'wepos-admin-notices' );

	if ( noticeList && noticeSlot ) {
		noticeSlot.appendChild( noticeList );
		noticeList.classList.remove( 'wepos-notice-list-hide' );
	}

	const container = document.getElementById( 'wepos-admin-panel-header' );

	if ( ! container ) {
		return;
	}

	createRoot( container ).render(
		<React.StrictMode>
			<ThemeProvider pluginId="wepos-admin" tokens={ tokens }>
				<SlotFillProvider>
					<Header />
					<PluginArea scope={ HEADER_PLUGIN_SCOPE } />
				</SlotFillProvider>
			</ThemeProvider>
		</React.StrictMode>
	);
};

export default Header;
