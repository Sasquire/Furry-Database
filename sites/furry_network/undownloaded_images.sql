select post_id, post_type, url, file_type
from fn.files
where status is null;
