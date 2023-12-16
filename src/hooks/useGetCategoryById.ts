import { useQuery } from 'vue-query';
import { useRoute } from 'vue-router';
import { CategoriesService } from '@/http-client';

export const useGetCategoryById = () => {
	const route = useRoute();

	const useCategoryQuery = (id: string) =>
		useQuery(['post', id], () => CategoriesService.categoriesControllerFindOne({ id: id }));

	const id = route.params.id as string;
	const { isLoading, isError, data, error, isSuccess } = useCategoryQuery(id);

	return {
		isLoading,
		isError,
		isSuccess,
		data,
		error,
	};
};
