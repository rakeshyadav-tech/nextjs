import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';

export default function SearchPage({ events }) {
	const router = useRouter();
	console.log(events);
	return (
		<Layout title='Dj Events'>
			<Link href='/events'>Go Back</Link>
			<h1> Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No events to show</h3>}
			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
			{/* {events.length > 0 && (
				<Link href='/events'>
					<a href='' className='btn-secondary'></a>
				</Link>
			)} */}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	// console.log(context.query);
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
			],
		},
	});
	const res = await fetch(`${API_URL}/events?${query}`);
	const events = await res.json();
	// log
	// console.log(events);
	return {
		props: { events },
	};
}
