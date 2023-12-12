import { TagsService } from '@/http-client/services/TagsService';
import { computed, ref, watch } from 'vue';
import { useQuery } from 'vue-query';

export const useTag = () => {
	const tagsFindAll = useQuery('tags', () => TagsService.tagsControllerFindAll());

	const optionsTags = computed(() => {
		if (tagsFindAll.data.value) {
			return tagsFindAll.data.value.map((tag: any) => tag.name);
		}
		return [];
	});

	const getTagsIdByNames = (names: string[]) => {
		const tags = [];

		for (const name of names) {
			const tag = tagsFindAll.data.value.find((tag: any) => tag.name === name);
			if (tag) {
				tags.push(tag.id);
			}
		}

		return tags;
	};

	return {
		tagsFindAll,
		optionsTags,
		getTagsIdByNames,
	};
};
