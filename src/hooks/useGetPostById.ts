import { useQuery } from 'vue-query';
import { PostsService } from '@/http-client/services/PostsService';
import { useRoute } from 'vue-router';

import '@vueup/vue-quill/dist/vue-quill.snow.css';

export const useGetPostById = () => {
	const route = useRoute();

	const usePostQuery = (id: string) =>
		useQuery(['post', id], () => PostsService.postsControllerFindOne({ id: id }));

	const id = route.params.id as string;
	const { isLoading, isError, data, error, isSuccess } = usePostQuery(id);

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
};
