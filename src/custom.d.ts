type RecordItem = {
  tags: string[],
  notes: string,
  type: string,
  amount: number,
  createdAt?: Date
}
type  Tag = {
  id: string;
  name: string
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
  tagList: Tag[];
}