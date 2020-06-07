#!/bin/bash
read -d '' sql << EOF
select 'e621' as name, status, count(*) from e621.files group by status
union
select 'fn' as name, status, count(*) from fn.files group by status;
EOF

PGPASSWORD=PASSWORD psql \
	-U USERNAME \
	-h localhost \
	-d furry \
	-c "$sql"