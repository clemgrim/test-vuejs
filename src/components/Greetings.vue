<template functional>
  <h1 v-if="props.identity">Hello {{ props.identity.name }}</h1>
  <h1 v-else>Hello guest</h1>
</template>