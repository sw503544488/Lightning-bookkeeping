<template>
  <Layout>
    <ol class="tagList">
      <li>
        <span>衣</span>
        <Icon name="right"></Icon>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"></Icon>

      </li>
      <li>
        <span>住</span>
        <Icon name="right"></Icon>

      </li>
      <li>
        <span>行</span>
        <Icon name="right"></Icon>

      </li>
    </ol>
    <div class="createTag-wraaper">
      <button class="createTag">
        新建标签
      </button>
    </div>

  </Layout>


</template>

<script lang='ts'>

export default {
  name: 'Labels',
};
</script>

<style lang="scss" scoped>
.tagList {
  background: white;
  font-size: 16px;

  > li {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;

    svg {
      color: #666666;
      margin-right: 16px;
      width: 18px;
      height: 18px;
    }
  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wraaper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>