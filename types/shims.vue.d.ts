declare module '*.vue' {
    import Vue from 'vue'

    let itemLoading = (args) => {
        var cell = args.ios;
        if (cell) {
            cell.sectionStyle =
            UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
        }
        export default itemLoading
    }
    export default Vue

}