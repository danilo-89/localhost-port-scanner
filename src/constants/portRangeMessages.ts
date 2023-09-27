export const portRangeMessages = {
    WELL_KNOWN_PORTS:
        'The port numbers in the range from 0 to 1023 are the well-known ports or system ports. They are used by system processes that provide widely used types of network services.',
    REGISTERED_PORTS:
        'The range of port numbers from 1024 to 49151 are the registered ports. They are assigned by IANA for specific service upon application by a requesting entity.',
    PRIVATE_PORTS:
        'The range from 49152 to 65535 contains dynamic or private ports that cannot be registered with IANA. This range is used for private or customized services, for temporary purposes, and for automatic allocation of ephemeral ports.',
}

export const PORT_RANGE_MESSAGES_SOURCE =
    'https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers'
