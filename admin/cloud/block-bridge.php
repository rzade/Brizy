<?php

/**
 * Class Brizy_Admin_Cloud_BlockUploader
 */
class Brizy_Admin_Cloud_BlockBridge extends Brizy_Admin_Cloud_AbstractBridge {

	use Brizy_Editor_Asset_AttachmentAware;

	/**
	 * @param Brizy_Editor_Block $block
	 *
	 * @return mixed|void
	 * @throws Exception
	 */
	public function export( $block ) {

		// check if the assets are uploaded in cloud
		// upload them if needed
		// create the block in cloud

		$media = json_decode( $block->getMedia() );

		if ( ! $media || ! isset( $media->fonts ) ) {
			throw new Exception( 'No fonts property in media object' );
		}

		if ( ! $media || ! isset( $media->images ) ) {
			throw new Exception( 'No images property in media object' );
		}

		$bridge = new Brizy_Admin_Cloud_MediaBridge( $this->client );
		foreach ( $media->images as $uid ) {
			$bridge->export( $uid );
		}

		$bridge = new Brizy_Admin_Cloud_FontBridge( $this->client );
		foreach ( $media->fonts as $fontUid ) {
			$bridge->export( $fontUid );
		}

		$this->client->createOrUpdateBlock( $block );
	}

	/**
	 * @param $blockId
	 *
	 * @return mixed|void
	 * @throws Exception
	 */
	public function import( $blockId ) {
		throw new Exception( 'Not implemented' );
	}

	/**
	 * @param Brizy_Editor_Block $block
	 *
	 * @return mixed|void
	 * @throws Exception
	 */
	public function delete( $block ) {
		$this->client->deleteBlock( $block->getCloudId() );
	}
}