type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,
  createdAt?: string | undefined,
}
type  Tag = {
  id: string;
  name: string
}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag

}
type TagListModel =
  {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' | 'number' //success表示成功,duplicated表示那么重复
    update: (id: string, name: string) => 'success' | 'notFound' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
  }

interface Window {
  store: {
    tagList: () => Tag[];
    createTag: (name: string) => void;
    removeTag: (id: string) => boolean;
    updateTag: (id: string, name: string) => 'success' | 'notFound' | 'duplicated';//也可以写成这样TagListModel['update']
    findTag: (id: string) => Tag;
    recordList: RecordItem[];
    createRecrod: (record: RecordItem) => void;
  };

}
