select post_id, url
from e621.downloads full join e621.urls using (post_id)
where status is null;