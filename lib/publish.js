const execa = require('execa');

module.exports = async (pluginConfig, {name}, context) => {
  const {
    cwd,
    env,
    stdout,
    stderr,
    nextRelease: {gitTag, version},
    logger,
  } = context;

  logger.log(`Publishing version ${version} to Pulsar registry`);

  const result = execa('pulsar', ['--package', 'publish', '--tag', gitTag], {
    cwd,
    env,
  });
  result.stdout.pipe(stdout, {end: false});
  result.stderr.pipe(stderr, {end: false});
  await result;

  logger.log(`Published ${name}@${version}`);
  return {name: 'Pulsar package', url: `https://web.pulsar-edit.dev/packages/${name}`};
};
