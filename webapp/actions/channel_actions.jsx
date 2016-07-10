// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {browserHistory} from 'react-router/es6';
import * as Utils from 'utils/utils.jsx';
import TeamStore from 'stores/team_store.jsx';
import UserStore from 'stores/user_store.jsx';
import ChannelStore from 'stores/channel_store.jsx';
import * as AsyncClient from 'utils/async_client.jsx';
import Client from 'utils/web_client.jsx';

export function goToChannel(channel) {
    if (channel.fake) {
        Utils.openDirectChannelToUser(
            UserStore.getProfileByUsername(channel.display_name),
            () => {
                browserHistory.push(TeamStore.getCurrentTeamRelativeUrl() + '/channels/' + channel.name);
            },
            null
        );
    } else {
        browserHistory.push(TeamStore.getCurrentTeamRelativeUrl() + '/channels/' + channel.name);
    }
}

export function executeCommand(channelId, message, suggest, success, error) {
    Client.executeCommand(channelId, message, suggest, success, error);
}

export function setChannelAsRead(channelIdParam) {
    const channelId = channelIdParam || ChannelStore.getCurrentId();
    AsyncClient.updateLastViewedAt();
    ChannelStore.resetCounts(channelId);
    ChannelStore.emitChange();
    if (channelId === ChannelStore.getCurrentId()) {
        ChannelStore.emitLastViewed(Number.MAX_VALUE, false);
    }
}
