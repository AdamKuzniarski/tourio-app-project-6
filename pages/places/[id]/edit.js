import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../../components/Form';
import { StyledLink } from '../../../components/StyledLink';

export default function EditPage() {
	const router = useRouter();
	const { isReady } = router;
	const { id } = router.query;
	const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);

	if (!isReady || isLoading || error) return <h2>Loading...</h2>;

	/*---------------------------------------------------------------------------------
   | Place Update
   |----------------------------------------------------------------------------------
   | - PUT-Request an die Backend-API (Endpoint: /api/places/${id})
   | - Formular-Daten als body im JSON-Format mitgeben
   | - Die API modifiziert anhand der Daten den DB-Eintrag
   | - SWR-mutate() aktualisiert bei Änderungen die Daten (Revalidierung/Refetching)
   */
	async function editPlace(placeData) {
		const response = await fetch(`/api/places/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(placeData),
		});

		if (!response.ok) {
			console.error(response.status);
			return;
		}

		mutate();

		router.push(`/places/${id}`);
	}

	return (
		<>
			<h2 id="edit-place">Edit Place</h2>

			<StyledLink href={`/places/${id}`} $justifySelf="start">
				back
			</StyledLink>

			<Form onSubmit={editPlace} formName={'edit-place'} defaultData={place} />
		</>
	);
}
