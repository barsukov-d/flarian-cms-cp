import { useQuery } from 'vue-query';
import { useRoute } from 'vue-router';
import { TagsService } from '@/http-client';

export const useGetTagById = () => {
	const route = useRoute();

	const useTagQuery = (id: string) =>
		useQuery(['post', id], () => TagsService.tagsControllerFindOne({ id: id }));

	const id = route.params.id as string;
	const { isLoading, isError, data, error, isSuccess } = useTagQuery(id);

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
};
