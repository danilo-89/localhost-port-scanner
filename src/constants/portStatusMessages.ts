export const portStatusMessages = {
    OK: 'This status indicates that the target port is accessible and may be actively serving a network service or application.',
    NOT_FOUND: `This status typically means that the port does not exist or is not recognized as a valid port for a known service or protocol. "Not Found" can also occur if a firewall or network filtering device is blocking access to the port and preventing the scanning tool from determining the service or protocol. In such cases, it might not be possible to determine whether the port is closed or open.`,
    UNSAFE_PORT: `When a port is marked as "Unsafe Port" it generally means that it's associated with a protocol or service that may have security risks, but it doesn't provide information about whether the port is open or closed.`,
    ADDRESS_INVALID: `This status indicates that the target address is not valid or cannot be resolved. Some common cases that might result in an "Address Invalid" status are: Non-existent Host, DNS Resolution Failure, Network Configuration Issues, Firewall or Network Filtering, Local Configuration Errors, Host Unreachable.`,
    INVALID_URL:
        'This status typically means that the URL (Uniform Resource Locator) provided is not in a valid format or does not conform to the expected structure for URLs. This message suggests that the URL cannot be interpreted or processed because it contains syntax errors, missing components, or other issues that prevent it from being recognized as a valid web address.',
    UNDEFINED: 'No info about this status.',
}

// network-related errors
// https://source.chromium.org/chromium/chromium/src/+/main:net/base/net_error_list.h
