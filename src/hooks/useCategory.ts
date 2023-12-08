import { CategoriesService } from '@/http-client/services/CategoriesService';
import { computed, ref, watch } from 'vue';
import { useQuery } from 'vue-query';

export const useCategory = () => {
	const categoriesFindAll = useQuery('categories', () =>
		CategoriesService.categoriesControllerFindAll(),
	);

	const getCategoryIdByName = (name: string) => {
		const category = categoriesFindAll.data.value.find(
			(category: any) => category.name === name,
		);
		if (category) {
			return category.id;
		}
		return 1;
	};

	const optionsCategories = computed(() => {
		if (categoriesFindAll.data.value) {
			return categoriesFindAll.data.value.map((category: any) => category.name);
		}
		return [];
	});

	return {
		categoriesFindAll,
		optionsCategories,
		getCategoryIdByName,
	};
};
