<template>
  <header class="header flex">
    <div class="brand flex">
      <img
        class="logo"
        src="@/assets/images/file-invoice-dollar-solid.png"
        alt=""
      />
    </div>
  </header>
</template>

<script>
export default {
  name: 'Navigation',
};
</script>

<style lang="scss" scoped>
.header {
  z-index: 99;
  flex-direction: row;
  background-color: #1e2139;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }

  .brand {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;

    @media (min-width: 900px) {
      width: 100%;
    }

    .logo {
      width: auto;
      height: 30px;
    }
  }
}
</style>
