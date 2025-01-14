import React from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/theme-common/internal';
import EditThisPage from '@theme/EditThisPage';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
import styles from './styles.module.css';
export default function BlogPostItemFooter() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {tags, title, editUrl, hasTruncateMarker} = metadata;
  // A post is truncated if it's in the "list view" and it has a truncate marker
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl;
  if (!renderFooter) {
    return null;
  }
  return (
    <div
      className={clsx(
        'row',
        isBlogPostPage && styles.blogPostFooterDetailsFull,
      )}>

      {isBlogPostPage && tagsExists && (
        <div className={clsx('col post-footer post-tags', {'col--9': truncatedPost})}>
          <TagsListInline tags={tags} />
        </div>
      )}

      {isBlogPostPage && editUrl && (
        <p className="col post-footer">
          <EditThisPage editUrl={editUrl} />
        </p>
      )}

      {truncatedPost && (
        <div
          className={clsx('col post-footer', {
            'col--3': tagsExists,
          })}>
          <p><ReadMoreLink blogPostTitle={title} to={metadata.permalink} /></p>
        </div>
      )}
    </div>
  );
}
