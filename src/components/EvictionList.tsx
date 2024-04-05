import { Link, useNavigate } from "react-router-dom";
import { evictionCardFields } from "../lib/types";
import { Typography, TableContainer, Paper, TableRow, TableCell, TableBody, TableHead, TableFooter, TablePagination } from "@mui/material";
import { KeyboardArrowRightRounded } from "@mui/icons-material";
import dayjs from "dayjs";
import { useState } from "react";

export function EvictionList({ ev: evictions, managePage }: { ev: evictionCardFields[], managePage: boolean }) {
	const navigate = useNavigate()
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<TableContainer component={Paper} sx={{ width: '100%' }}>
			{(evictions && evictions.length) ?
				(<TableHead>
					<TableRow>
						<TableCell>
							<Typography>Eviction Date</Typography>
						</TableCell>
						<TableCell>
							<Typography>Match Criteria</Typography>
						</TableCell>
						<TableCell>
							<Typography>Details</Typography>
						</TableCell>
					</TableRow>
				</TableHead>) :
				<TableBody>
					<TableRow>
						<TableCell>
							<Typography>No reported evictions found</Typography>
						</TableCell>
					</TableRow>
				</TableBody>}
			<TableBody sx={{ width: '100%' }}>
				{evictions
					.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
					.map((ev: evictionCardFields) => (
						<TableRow onClick={() => navigate(`/dashboard/eviction/${ev._id}${managePage ? '?m=edit' : ''}`)}>
							<TableCell sx={{ width: '40%' }}>
								<Typography>{dayjs(ev.evictedOn).format('MMM-DD-YYYY')}</Typography>
							</TableCell>
							<TableCell sx={{ width: '50%' }}>
								<Typography>{`${ev.nameMatches ? 'Name' : ''} ${ev.phoneMatches ? 'Phone' : ''} ${ev.emailMatches ? 'Email' : ''}`}</Typography>
							</TableCell>
							<TableCell sx={{ width: '10%', textAlign: 'right' }}>
								<KeyboardArrowRightRounded />
							</TableCell>
						</TableRow>
					))
				}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TablePagination
						count={evictions.length}
						rowsPerPageOptions={[10, 25, { label: 'All', value: -1 }]}
						rowsPerPage={rowsPerPage}
						page={page}
						colSpan={3}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</TableRow>
			</TableFooter>
		</TableContainer>
	)
}