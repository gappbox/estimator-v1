// import core
import { _, $, provider, confirm } from 'vendors';
import React, { Component } from 'react';

// import components
import ProjectTitle from '../project-title';
import Additional from '../additional';
import UploadFile from '../files/file-upload';
import DownloadZIP  from '../files/file-download';
import FileBackup from '../files/file-backup';
import Information from '../information';

// import widgets
import OpenClose from 'widgets/open-close';

// import styles
import './styles';

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
           items: [
               {
                   id: 'nb1',
                   link: 'Project',
                   heading: 'Project Title',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDYxMiA2MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDYxMiA2MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iU2hhcGVfODc4Ij4KCQk8Zz4KCQkJPHBhdGggZD0iTTU5MS42LDAuMDFIMjAuNEM5LjEyOSwwLjAxLDAsOS4xMzksMCwyMC4zOTlWMTUzaDYxMnYtMTMyLjZDNjEyLDkuMTM5LDYwMi44NzEsMC4wMSw1OTEuNiwwLjAxeiBNMTk4LjksMTAxLjk4OUg4Ni43ICAgICBjLTguNDQ2LDAtMTUuMy02Ljg0NC0xNS4zLTE1LjI4YzAtOC40NjYsNi44NTQtMTUuMywxNS4zLTE1LjNoMTEyLjJjOC40NDYsMCwxNS4zLDYuODM0LDE1LjMsMTUuMyAgICAgQzIxNC4yLDk1LjE0NSwyMDcuMzQ2LDEwMS45ODksMTk4LjksMTAxLjk4OXogTTM0MS43LDEwMS45ODloLTYxLjJjLTguNDQ2LDAtMTUuMy02Ljg1NC0xNS4zLTE1LjI4ICAgICBjMC04LjQ2Niw2Ljg1NC0xNS4zLDE1LjMtMTUuM2g2MS4yYzguNDU2LDAsMTUuMyw2LjgzNCwxNS4zLDE1LjNDMzU3LDk1LjE0NSwzNTAuMTU2LDEwMS45ODksMzQxLjcsMTAxLjk4OXogTTQ3NC4zLDEwMS45ODkgICAgIGMtOC40NDUsMC0xNS4zLTYuODU0LTE1LjMtMTUuMjhjMC04LjQ2Niw2Ljg1NC0xNS4zLDE1LjMtMTUuM3MxNS4zLDYuODM0LDE1LjMsMTUuM0M0ODkuNiw5NS4xNDUsNDgyLjc0NSwxMDEuOTg5LDQ3NC4zLDEwMS45ODkgICAgIHogTTUyNS4zLDEwMS45ODljLTguNDU2LDAtMTUuMy02Ljg1NC0xNS4zLTE1LjI4YzAtOC40NjYsNi44NTQtMTUuMywxNS4zLTE1LjNjOC40NDYsMCwxNS4zLDYuODM0LDE1LjMsMTUuMyAgICAgQzU0MC42LDk1LjE0NSw1MzMuNzQ2LDEwMS45ODksNTI1LjMsMTAxLjk4OXogTTAsNDU4Ljk5YzAsMTEuMjYsOS4xMjksMjAuNDEsMjAuNCwyMC40MWgyNzUuNFY1OTEuNkgxMC4yICAgICBjLTUuNjMsMC0xMC4yLDQuNTQ5LTEwLjIsMTAuMTg5czQuNTcsMTAuMjAxLDEwLjIsMTAuMjAxaDU5MS42YzUuNjMxLDAsMTAuMi00LjU2MSwxMC4yLTEwLjIwMXMtNC41NjktMTAuMTg5LTEwLjItMTAuMTg5SDMxNi4yICAgICBWNDc5LjRINTkxLjZjMTEuMjcxLDAsMjAuNC05LjE1LDIwLjQtMjAuNDFWMzI2LjQxSDBWNDU4Ljk5eiBNNTI1LjMsMzc3LjRjOC40NDYsMCwxNS4zLDYuODU0LDE1LjMsMTUuMjk5ICAgICBTNTMzLjc0Niw0MDgsNTI1LjMsNDA4Yy04LjQ1NiwwLTE1LjMtNi44NTUtMTUuMy0xNS4zMDFTNTE2Ljg1NCwzNzcuNCw1MjUuMywzNzcuNHogTTQ3NC4zLDM3Ny40ICAgICBjOC40NDUsMCwxNS4zLDYuODU0LDE1LjMsMTUuMjk5UzQ4Mi43NDUsNDA4LDQ3NC4zLDQwOHMtMTUuMy02Ljg1NS0xNS4zLTE1LjMwMVM0NjUuODU0LDM3Ny40LDQ3NC4zLDM3Ny40eiBNMjgwLjUsMzc3LjRoNjEuMiAgICAgYzguNDQ1LDAsMTUuMyw2Ljg1NCwxNS4zLDE1LjI5OVMzNTAuMTQ2LDQwOCwzNDEuNyw0MDhoLTYxLjJjLTguNDQ2LDAtMTUuMy02Ljg1NS0xNS4zLTE1LjMwMVMyNzIuMDU0LDM3Ny40LDI4MC41LDM3Ny40eiAgICAgIE04Ni43LDM3Ny40aDExMi4yYzguNDQ2LDAsMTUuMyw2Ljg1NCwxNS4zLDE1LjI5OVMyMDcuMzQ2LDQwOCwxOTguOSw0MDhIODYuN2MtOC40NDYsMC0xNS4zLTYuODU1LTE1LjMtMTUuMzAxICAgICBTNzguMjU0LDM3Ny40LDg2LjcsMzc3LjR6IE0wLDMwNmg2MTJWMTczLjQxSDBWMzA2eiBNNTI1LjMsMjI0LjM4OWM4LjQ0NiwwLDE1LjMsNi44NjUsMTUuMywxNS4zYzAsOC40NjYtNi44NTQsMTUuMy0xNS4zLDE1LjMgICAgIGMtOC40NTYsMC0xNS4zLTYuODM0LTE1LjMtMTUuM0M1MTAsMjMxLjI1NCw1MTYuODU0LDIyNC4zODksNTI1LjMsMjI0LjM4OXogTTQ3NC4zLDIyNC4zODljOC40NDUsMCwxNS4zLDYuODY1LDE1LjMsMTUuMyAgICAgYzAsOC40NjYtNi44NTQsMTUuMy0xNS4zLDE1LjNzLTE1LjMtNi44MzQtMTUuMy0xNS4zQzQ1OSwyMzEuMjU0LDQ2NS44NTQsMjI0LjM4OSw0NzQuMywyMjQuMzg5eiBNMjgwLjUsMjI0LjM4OWg2MS4yICAgICBjOC40NDUsMCwxNS4zLDYuODY1LDE1LjMsMTUuM2MwLDguNDY2LTYuODU0LDE1LjMtMTUuMywxNS4zaC02MS4yYy04LjQ0NiwwLTE1LjMtNi44MzQtMTUuMy0xNS4zICAgICBDMjY1LjIsMjMxLjI1NCwyNzIuMDU0LDIyNC4zODksMjgwLjUsMjI0LjM4OXogTTg2LjcsMjI0LjM4OWgxMTIuMmM4LjQ0NiwwLDE1LjMsNi44NjUsMTUuMywxNS4zYzAsOC40NjYtNi44NTQsMTUuMy0xNS4zLDE1LjMgICAgIEg4Ni43Yy04LjQ0NiwwLTE1LjMtNi44MzQtMTUuMy0xNS4zQzcxLjQsMjMxLjI1NCw3OC4yNTQsMjI0LjM4OSw4Ni43LDIyNC4zODl6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
                   component: <ProjectTitle />,
                   active: false
               },
               {
                   id: 'nb2',
                   link: 'Additional',
                   heading: 'Additional Options',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAyOTAgMjkwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyOTAgMjkwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPHJlY3QgeT0iMjIwIiB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IiNGRkZGRkYiLz4KCTxyZWN0IHk9IjExMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRkZGRkZGIi8+Cgk8cmVjdCB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IiNGRkZGRkYiLz4KCTxyZWN0IHg9IjExMCIgeT0iMjIwIiB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IiNGRkZGRkYiLz4KCTxyZWN0IHg9IjExMCIgeT0iMTEwIiB3aWR0aD0iNzAiIGhlaWdodD0iNzAiIGZpbGw9IiNGRkZGRkYiLz4KCTxyZWN0IHg9IjExMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRkZGRkZGIi8+Cgk8cmVjdCB4PSIyMjAiIHk9IjIyMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRkZGRkZGIi8+Cgk8cmVjdCB4PSIyMjAiIHk9IjExMCIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjRkZGRkZGIi8+Cgk8cmVjdCB4PSIyMjAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI3MCIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
                   component: <Additional />,
                   active: false
               },
               {
                   id: 'nb3',
                   link: 'Upload',
                   heading: 'Upload Files',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyMCAyMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0xNSw3Yy0wLjExNSwwLTAuMjMxLDAuMDA1LTAuMzUxLDAuMDE1QzEzLjgyNCw0LjYzOCwxMS41ODcsMyw5LDNDNS42OTEsMywzLDUuNjkxLDMsOSAgIGMwLDAuMDQyLDAsMC4wODQsMC4wMDEsMC4xMjZDMS4yNzcsOS41NzEsMCwxMS4xMzksMCwxM2MwLDIuMjA2LDEuNzk0LDQsNCw0aDV2LTQuNTg2bC0xLjI5MywxLjI5M0M3LjUxMiwxMy45MDIsNy4yNTYsMTQsNywxNCAgIHMtMC41MTItMC4wOTgtMC43MDctMC4yOTNjLTAuMzkxLTAuMzkxLTAuMzkxLTEuMDIzLDAtMS40MTRsMi45OTktMi45OTljMC4wOTMtMC4wOTMsMC4yMDMtMC4xNjYsMC4zMjYtMC4yMTcgICBjMC4yNDQtMC4xMDEsMC41Mi0wLjEwMSwwLjc2NCwwYzAuMTIzLDAuMDUxLDAuMjMzLDAuMTI0LDAuMzI2LDAuMjE3bDIuOTk5LDIuOTk5YzAuMzkxLDAuMzkxLDAuMzkxLDEuMDIzLDAsMS40MTQgICBDMTMuNTEyLDEzLjkwMiwxMy4yNTYsMTQsMTMsMTRzLTAuNTEyLTAuMDk4LTAuNzA3LTAuMjkzTDExLDEyLjQxNFYxN2g0YzIuNzU3LDAsNS0yLjI0Myw1LTVTMTcuNzU3LDcsMTUsN3oiIGZpbGw9IiNGRkZGRkYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
                   component: <UploadFile />,
                   active: false
               },
               {
                   id: 'nb4',
                   link: 'Info',
                   heading: 'Information',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTAsMHY1MTJoNTEyVjBIMHogTTI0Ni44NTcsMTA5LjcxNGMyMC4xNjYsMCwzNi41NzEsMTYuNDA2LDM2LjU3MSwzNi41NzFzLTE2LjQwNiwzNi41NzEtMzYuNTcxLDM2LjU3MSAgICBjLTIwLjE2NSwwLTM2LjU3MS0xNi40MDYtMzYuNTcxLTM2LjU3MVMyMjYuNjkyLDEwOS43MTQsMjQ2Ljg1NywxMDkuNzE0eiBNMzIwLDM5My4xNDNIMjE5LjQyOVYyMTkuNDI5aDU0Ljg1N3YxMTguODU3SDMyMCAgICBWMzkzLjE0M3oiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K',
                   component: <Information />,
                   active: false
               },
               {
                   id: 'nb5',
                   link: 'Download',
                   heading: 'Download ZIP',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMCA2di02aC00djZoLTJsNCA1IDQtNXoiLz4KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEzIDFoLTJ2MWgxLjNsMi42IDhoLTMuOXYyaC02di0yaC0zLjlsMi42LThoMS4zdi0xaC0ybC0zIDl2NWgxNnYtNXoiLz4KPC9zdmc+Cg==',
                   component: <DownloadZIP />,
                   active: false
               },
               {
                   id: 'nb6',
                   link: 'Backup',
                   heading: 'File Backup',
                   icon: 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0xNCwyMy41Yy0wLjI1NCwwLTAuNDc5LDAuMTcyLTAuNTQ1LDAuNDE3TDIsNTIuNXYxYzAsMC43MzQtMC4wNDcsMSwwLjU2NSwxaDQ0Ljc1OWMxLjE1NiwwLDIuMTc0LTAuNzc5LDIuNDUtMS44MTMgICBMNjAsMjQuNWMwLDAsMC0wLjYyNSwwLTFIMTR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8cGF0aCBkPSJNMTIuNzMxLDIxLjVINTNoMXYtNi4yNjhjMC0xLjUwNy0xLjIyNi0yLjczMi0yLjczMi0yLjczMkgyNi41MTVsLTUtN0gyLjczMkMxLjIyNiw1LjUsMCw2LjcyNiwwLDguMjMydjQxLjc5NiAgIGwxMC4yODItMjYuNzE3QzEwLjU1NywyMi4yNzksMTEuNTc1LDIxLjUsMTIuNzMxLDIxLjV6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==',
                   component: <FileBackup />,
                   active: false
               }
           ]
        };
    }

    componentDidMount() {
        this.items = this.menu.querySelectorAll('.navbar__item:not(.not-js)');

        $(this.items).openClose({
            opener: '.navbar__opener',
            closer: '.navbar__closer',
            slider: '.navbar__dropdown',
            hiddenClass: '',
            effect: 'none'
        })
    }

    componentWillUnmount() {
        $(this.items).each((item) => {
            const instance = $(item).data('OpenClose');

            if (instance) {
                instance.destroy();
            }
        })
    }

    onUserReset(event) {
        confirm.open('Are you sure? <br>Do you want to reset estimation?').then((status) => {
            if (status) {
                provider.clear().then(() => { window.location.reload(); });
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <nav className="navbar">
                <ul className="navbar__menu" ref={ (menu) => { this.menu = menu; }}>
                    { this.state.items.map((item) => {
                        return (
                            <li key={ item.id } className={`navbar__item ${item.active ? 'active': ''}`}>
                                <a href="#" className="navbar__opener">
                                    <img height="17" width="17" src={ item.icon } />
                                    <span>{ item.link }</span>
                                </a>
                                <div className="navbar__dropdown">
                                    <h2 className="navbar__title">{ item.heading }</h2>
                                    <a href="#" className="navbar__closer">
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </a>
                                    { item.component }
                                </div>
                            </li>
                        )
                    })}
                    <li className="navbar__item not-js">
                        <a href="#" className="navbar__opener" onClick={(event) => { this.onUserReset(event) }}>
                            <img height="17" width="17" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDQ4Ny4yMyA0ODcuMjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4Ny4yMyA0ODcuMjM7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNTUuMzIzLDIwMy42NDFjMTUuNjY0LDAsMjkuODEzLTkuNDA1LDM1Ljg3Mi0yMy44NTRjMjUuMDE3LTU5LjYwNCw4My44NDItMTAxLjYxLDE1Mi40Mi0xMDEuNjEgICAgYzM3Ljc5NywwLDcyLjQ0OSwxMi45NTUsMTAwLjIzLDM0LjQ0MmwtMjEuNzc1LDMuMzcxYy03LjQzOCwxLjE1My0xMy4yMjQsNy4wNTQtMTQuMjMyLDE0LjUxMiAgICBjLTEuMDEsNy40NTQsMy4wMDgsMTQuNjg2LDkuODY3LDE3Ljc2OGwxMTkuNzQ2LDUzLjg3MmM1LjI0OSwyLjM1NywxMS4zMywxLjkwNCwxNi4xNjgtMS4yMDUgICAgYzQuODMtMy4xMTQsNy43NjQtOC40NTgsNy43OTYtMTQuMjA4bDAuNjIxLTEzMS45NDNjMC4wNDItNy41MDYtNC44NTEtMTQuMTQ0LTEyLjAyNC0xNi4zMzIgICAgYy03LjE4NS0yLjE4OC0xNC45NDcsMC41ODktMTkuMTA0LDYuODM3bC0xNi41MDUsMjQuODA1QzM3MC4zOTgsMjYuNzc4LDMxMC4xLDAsMjQzLjYxNSwwQzE0Mi44MDYsMCw1Ni4xMzMsNjEuNTYyLDE5LjE2NywxNDkuMDYgICAgYy01LjEzNCwxMi4xMjgtMy44NCwyNi4wMTUsMy40MjksMzYuOTg3QzI5Ljg2NSwxOTcuMDIzLDQyLjE1MiwyMDMuNjQxLDU1LjMyMywyMDMuNjQxeiIgZmlsbD0iI0ZGRkZGRiIvPgoJCTxwYXRoIGQ9Ik00NjQuNjM1LDMwMS4xODRjLTcuMjctMTAuOTc3LTE5LjU1OC0xNy41OTQtMzIuNzI4LTE3LjU5NGMtMTUuNjY0LDAtMjkuODEzLDkuNDA1LTM1Ljg3MiwyMy44NTQgICAgYy0yNS4wMTgsNTkuNjA0LTgzLjg0MywxMDEuNjEtMTUyLjQyLDEwMS42MWMtMzcuNzk4LDAtNzIuNDUtMTIuOTU1LTEwMC4yMzItMzQuNDQybDIxLjc3Ni0zLjM2OSAgICBjNy40MzctMS4xNTMsMTMuMjIzLTcuMDU1LDE0LjIzMy0xNC41MTRjMS4wMDktNy40NTMtMy4wMDgtMTQuNjg2LTkuODY3LTE3Ljc2OEw0OS43NzksMjg1LjA4OSAgICBjLTUuMjUtMi4zNTYtMTEuMzMtMS45MDUtMTYuMTY5LDEuMjA1Yy00LjgyOSwzLjExNC03Ljc2NCw4LjQ1OC03Ljc5NSwxNC4yMDdsLTAuNjIyLDEzMS45NDMgICAgYy0wLjA0Miw3LjUwNiw0Ljg1LDE0LjE0NCwxMi4wMjQsMTYuMzMyYzcuMTg1LDIuMTg4LDE0Ljk0OC0wLjU5LDE5LjEwNC02LjgzOWwxNi41MDUtMjQuODA1ICAgIGM0NC4wMDQsNDMuMzIsMTA0LjMwMyw3MC4wOTgsMTcwLjc4OCw3MC4wOThjMTAwLjgxMSwwLDE4Ny40ODEtNjEuNTYxLDIyNC40NDYtMTQ5LjA1OSAgICBDNDczLjE5NywzMjYuMDQzLDQ3MS45MDMsMzEyLjE1Nyw0NjQuNjM1LDMwMS4xODR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                            <span>Reset</span>
                        </a>
                    </li>
                </ul>
            </nav>
        )
    }
}
