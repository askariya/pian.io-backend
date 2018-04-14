module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    context.data = {
      nameOfComposition : data.nameOfComposition,
      user: data.user
    };

    return context;
  };
};
