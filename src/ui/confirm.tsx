import { Box, Button, Container, Stack, TextField, Typography, styled } from "@mui/material";
import { Form, useLoaderData } from "react-router-dom";
import { evictionPageFields } from "../lib/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Content, Label, dayjsDateFormat } from "../lib/styled";

export function ConfirmPage() {
	const report = useLoaderData() as evictionPageFields
	dayjs.extend(utc)

	return (
		<Container
			sx={{
				bgcolor: 'primary.main',
				paddingBottom: 2,
				borderBottomLeftRadius: 5,
				borderBottomRightRadius: 5
			}}
		>
			<Container sx={{ bgcolor: 'white', borderRadius: 2 }}>
				<Box sx={{ width: '100%', textAlign: 'center' }}>
					<Typography variant='h5'>
						Confirm Report
					</Typography>
				</Box>
				<Stack>
					<Label>Tenant Name:</Label>
					<Content>{report.tenantName}</Content>
					<Label>Tenant Phone:</Label>
					<Content>{report.tenantPhone}</Content>
					<Label>Tenant Email:</Label>
					<Content>{report.tenantEmail}</Content>
					<Label>Evicted On:</Label>
					<Content>{dayjs(report.evictedOn).utc().format(dayjsDateFormat)}</Content>
					<Label>Reason:</Label>
					<Content>{report.reason}</Content>
					<Label>Details:</Label>
					{report.details.map((d) => (
						<Content>{d.content}</Content>
					))}
				</Stack>
				<Container sx={{ width: '100%', textAlign: 'center' }}>
					<Form method='POST'>
						<input type='hidden' name='confirmId' id='confirmId' value={report._id} />
						<Button
							type='submit'
							variant='contained'
						>Submit
						</Button>
						<Button
							type='reset'
							variant='contained'
							color='warning'
						>Reset
						</Button>
					</Form>
				</Container>
			</Container>
		</Container>
	);
}

