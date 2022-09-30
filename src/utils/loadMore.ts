import { LoadMoreOptionsWithFormat } from '@ahooksjs/use-request/lib/types';

export const loadMoreService = (service: (params: any, data: any) => Promise<any>) => {
  return (data: any) => {
    const params = { pageSize: 20, pageNo: (data?.pagination?.pageNo || 0) + 1 };
    return service(params, data);
  };
};

export const loadMoreOptions: LoadMoreOptionsWithFormat<any, any> = {
  loadMore: true,
  initialData: {
    list: [],
    pagination: {
      totalCount: null,
      pageNo: null,
      pageSize: null,
    },
  },
  formatResult: (response: any) => {
    return {
      list: response.data.records,
      pagination: {
        pageSize: response.data?.pageSize,
        pageNo: response.data?.pageNo,
        totalCount: response.data?.totalCount,
      },
    };
  },
  isNoMore(result: any) {
    return result.list.length >= result.pagination?.totalCount;
  },
};
