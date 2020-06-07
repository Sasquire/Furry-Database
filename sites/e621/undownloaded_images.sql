select given_md5, file_type, url
from e621.urls
where status is null;
