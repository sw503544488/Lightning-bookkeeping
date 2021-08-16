const localStorageKeyName = 'tagList';
type TagListModel =
    {
        data: string[]
        fetch: () => string[]
        create: (name: string) => 'success' | 'duplicated' | 'number' //success表示成功,duplicated表示那么重复
        save: () => void
    }
const tagListModel: TagListModel = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name: string) {
        if (this.data.indexOf(name) >= 0) {
            return 'duplicated';
        }
        if ('0123456789'.indexOf(name)>=0){return 'number'}
        this.data.push(name);
        this.save();
        return 'success';
    },

    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));

    }
};

export default tagListModel;
