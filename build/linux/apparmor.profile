abi <abi/4.0>,
include <tunables/global>

profile openstudio /opt/Open\ Generative\ AI/openstudio flags=(unconfined) {
  userns,
  include if exists <local/openstudio>
}
